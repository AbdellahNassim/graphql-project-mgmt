export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type ClientQuery = {
  clients: Client[];
};
