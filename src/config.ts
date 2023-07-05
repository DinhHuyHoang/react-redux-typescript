/// <reference types="node" />

// import dotenv from 'dotenv';
const isDev = process.env.NODE_ENV === 'development';
const envFile = `.env.${process.env.NODE_ENV}`;

interface ENV {
  NODE_ENV: string | undefined;
}

interface Config {
  NODE_ENV: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in ${envFile}`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export { isDev };
export default sanitizedConfig;
