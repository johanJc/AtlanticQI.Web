export interface Client {
    idClient?: number;
    firstName: string;
    lastName: string;
    email?: string;              
    phone?: string;              
    birthDate?: Date;            
    documentType?: string;       
    documentNumber: string;
    address?: string;            
    city?: string;               
    createdAt?: Date;
    updatedAt?: Date;            
  }
  