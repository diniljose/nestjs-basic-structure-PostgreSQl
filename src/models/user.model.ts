import { DatabaseFeatureOptions } from "src/lib/database/interfaces/database.interface";

export const UserTableDefinition: DatabaseFeatureOptions = {
	tableName: 'users',
	columns: {
	  id: 'SERIAL PRIMARY KEY',
	  kala_id: 'VARCHAR(255) NOT NULL',
	  last_name: 'VARCHAR(255) NOT NULL',
	  name: 'VARCHAR(255) NOT NULL',
	  created_date: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
	  updated_date: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
	},
  };
  