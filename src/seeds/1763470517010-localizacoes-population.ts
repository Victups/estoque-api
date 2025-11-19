import { DataSource } from 'typeorm';
import type { SeederFactoryManager } from 'typeorm-extension';
import { Seeder } from './seeder.interface';

export class LocalizacoesPopulation1763470517010 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        await dataSource.query(`
            INSERT INTO public.localizacoes (id_deposito, corredor, prateleira, secao)
            VALUES
              ((SELECT id FROM public.depositos WHERE nome = 'Depósito Central'), 'A1', 'P1', 'S1'),
              ((SELECT id FROM public.depositos WHERE nome = 'Depósito Central'), 'A2', 'P2', 'S1'),
              ((SELECT id FROM public.depositos WHERE nome = 'Depósito de Refrigerados'), 'B1', 'P1', 'S1'),
              ((SELECT id FROM public.depositos WHERE nome = 'Depósito de Refrigerados'), 'B2', 'P2', 'S2')
            ON CONFLICT DO NOTHING;
        `);
    }
}

