import type { Channel } from '@root/typings/types';
import React, { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { setCurrentChannel, getChannels } from '@redux/slices/channel.slice';

type Props = {};

function ChannelComponent(props: Props) {
  const storeChannels = useAppSelector((state) => state.channel);
  const dispatch = useAppDispatch();

  const channels = storeChannels.value;

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  function handleSelectChannel(channel: Channel) {
    dispatch(setCurrentChannel({ channel }));
  }

  const renderChannels = useMemo(() => {
    return channels.map((item) => (
      <div className="channel-item" key={item.id} onClick={() => handleSelectChannel(item)}>
        {item.name}
      </div>
    ));
  }, [channels]);

  return <div className="channel-container">{renderChannels}</div>;
}

export default ChannelComponent;
