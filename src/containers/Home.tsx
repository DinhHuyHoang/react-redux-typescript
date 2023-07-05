import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import ChannelComponent from '@components/Channel';
import ChatBox from '@components/ChatBox';

type Props = {};

function Home(props: Props) {
  return (
    <div className="home-container">
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <ChannelComponent />
        </Grid>
        <Grid item xs={10}>
          <ChatBox />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
