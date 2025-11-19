import { DataSource } from 'typeorm';
import type { SeederFactoryManager } from 'typeorm-extension';
import { Seeder } from './seeder.interface';

export class FornecedorEnderecoPopulation1763470517012 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        await dataSource.query(`
            INSERT INTO public.fornecedor_endereco (id_fornecedor, id_endereco, tipo_endereco)
            VALUES
              ((SELECT id FROM public.fornecedores WHERE nome = 'Distribuidora de Alimentos Goiás'), (SELECT id FROM public.enderecos WHERE logradouro = 'Avenida Comercial'), 'Comercial'),
              ((SELECT id FROM public.fornecedores WHERE nome = 'Laticínios Centro-Oeste'), (SELECT id FROM public.enderecos WHERE logradouro = 'Rodovia BR-153'), 'Fábrica'),
              ((SELECT id FROM public.fornecedores WHERE nome = 'Frios Brasil S.A.'), (SELECT id FROM public.enderecos WHERE logradouro = 'Avenida Industrial'), 'Matriz')
            ON CONFLICT DO NOTHING;
        `);
    }
}

