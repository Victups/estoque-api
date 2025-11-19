import { DataSource } from 'typeorm';
import type { SeederFactoryManager } from 'typeorm-extension';
import { Seeder } from './seeder.interface';

export class EnderecosPopulation1763470517003 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        await dataSource.query(`
            INSERT INTO public.enderecos (logradouro, numero, complemento, id_municipio)
            VALUES
              ('Avenida Principal', '100', 'Sala 1', 5547),
              ('Rua das Flores', '250', NULL, 5418),
              ('Avenida Comercial', '1234', 'Galpão A', 5342),
              ('Rodovia BR-153', 'Km 5', 'Lote 2', 5342),
              ('Avenida Industrial', '5678', NULL, 5556)
            ON CONFLICT DO NOTHING;
        `);
    }
}

