export interface Client {
    name: string;
    email: string;
    phone: string;
  }
  
export interface ClientTileProps {
    client: Client;
}

export interface AddClientFormProps {
    onAddClient: (client: Client) => void;
  }