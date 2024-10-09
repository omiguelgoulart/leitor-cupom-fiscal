import { Router } from 'express';
import type { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = Router();

router.get('/buscar-dados', async (req: Request, res: Response) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'A URL do QR Code é obrigatória.' });
    }

    try {
        // Faz a requisição HTTP para a URL do QR Code
        const response = await axios.get(url as string);
        const html = response.data;

        // Carrega o HTML da página com cheerio
        const $ = cheerio.load(html);

        // Extrai os dados desejados
        const nomeEstabelecimento = $('.txtTopo').first().text().trim();
        const valorTotal = $('#linhaTotal .txtMax').first().text().trim();
        const dataEmissao = $('strong:contains("Emissão:")')
            .parent()
            .text()
            .split('Emissão:')[1]
            .trim()
            .split('-')[0]
            .trim();

        // Retorna os dados extraídos em formato JSON
        res.json({
            nome: nomeEstabelecimento,
            valor: valorTotal,
            data: dataEmissao,
        });
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ error: 'Erro ao buscar os dados do cupom fiscal.' });
    }
});

export default router;
