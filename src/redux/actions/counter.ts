import { createAction, nanoid, PrepareAction } from '@reduxjs/toolkit';

export type incrementPayloadType = {
  name: string;
};

export const incrementAsync = createAction<PrepareAction<incrementPayloadType>>(
  'counter/incrementAsync',
  ({ name }: incrementPayloadType): { payload: incrementPayloadType } => {
    console.log('incrementAsync');

    return {
      payload: {
        name: name + nanoid(),
      },
    };
  },
);

// export const incrementAsync = createAction<incrementPayloadType>('counter/incrementAsync');
