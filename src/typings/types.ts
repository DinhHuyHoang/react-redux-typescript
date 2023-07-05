declare global {
  interface Window {
    [key: string]: any;
  }
}

export type SagaError = {
  message: string;
};

export type User = {
  id: string;
  name: string;
};

export type Channel = {
  id: string;
  name: string;
  members: User[];
};
