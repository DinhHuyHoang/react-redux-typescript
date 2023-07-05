import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { uploadFiles } from '@redux/slices/channel.slice';
import { io, Socket } from 'socket.io-client';
import { useToggle } from '@root/hooks/useToggle';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

type Props = {};

function ChatBox(props: Props) {
  const storeChannel = useAppSelector((state) => state.channel);
  const dispatch = useAppDispatch();

  const [socket, setSocket] = useState<null | Socket>(null);
  const [message, setMessage] = useState('');
  const [open, toggle] = useToggle();
  const [search, setSearch] = useState('');

  const inputFileRef = useRef<any>(null);

  const currentChannel = storeChannel.currentChannel;
  const members = currentChannel?.members || [];

  useEffect(() => {
    if (!currentChannel) return;

    const newSocket = io('http://localhost:3000');

    newSocket.on('connection', (socket) => {
      socket.emit('join_room', currentChannel.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [currentChannel]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', function (data) {
      console.log('Incoming message:', data);
    });
  }, [socket]);

  function handleSendMessage(message: string) {
    console.log(message);
    socket?.emit('send_message', { message });
  }

  async function onFileChange(acceptedFiles: FileList | null) {
    if (!acceptedFiles || !currentChannel) return;

    // for (const file of acceptedFiles) {
    //   console.log(file);
    // }

    dispatch(uploadFiles({ id: currentChannel.id, files: acceptedFiles }));

    inputFileRef.current.value = null;
  }

  const renderMembers = useMemo(() => {
    return members.map((member) => (
      <div className="item" key={member.id} title={member.name} onClick={toggle}>
        M
      </div>
    ));
  }, [members]);

  if (!currentChannel) {
    return (
      <div>
        Select a channel. (Assume you signed in with the User is = 0, and get all private channels which you have been
        member already)
      </div>
    );
  }

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <div className="channel-name">#{currentChannel.name}</div>
        <div className="channel-member">{renderMembers}</div>
      </div>
      <div className="chatbox-messages"></div>
      <div className="chatbox-input">
        <textarea
          placeholder="Message..."
          value={message}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
        />
        <div className="chatbox-tools">
          <span className="icon" onClick={() => handleSendMessage(message)}>
            <SendIcon />
          </span>
          <span className="icon" onClick={() => inputFileRef.current.click()}>
            <AttachFileIcon />
          </span>
        </div>
      </div>

      <Dialog open={open} onClose={toggle}>
        <DialogTitle>Members</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Filter"
            type="text"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DialogContentText>
            {members
              .filter((item) => {
                if (!search) return true;
                if (item.name.toLocaleLowerCase().includes(search.toLowerCase())) return true;

                return false;
              })
              .map((member) => (
                <div key={member.id} title={member.name}>
                  <div>{member.name}</div>
                </div>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <input
        ref={inputFileRef}
        multiple
        accept=".pdf"
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => onFileChange(e.target.files)}
      />
    </div>
  );
}

export default ChatBox;
