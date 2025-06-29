// General settings and use appwrite
import { Client, Databases, Storage, Account, Query } from "appwrite";
const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

// Instantiate Appwrite Database and Storage classes for database and file operations
const db = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

// get image url on appwrite storage and show on ui
function getImageUrl(fileId) {
	return `${client.config.endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${client.config.project}`;
}

// getting export from the methods and constants we are going to use
export { storage, db, account, BUCKET_ID, DB_ID, getImageUrl, Query };
