import axios from "axios";

const cnpj = async (req, res) => {
  try {
    const cnpj = req.params.cnpj;
    const response = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
    const empresa = response.data;

    return res.status(200).json({
      success: true,
      status: 200,
      data: empresa,
      message: "Empresa encontrada com sucesso!"
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Erro ao buscar CNPJ"
    });
  }
};

export { cnpj };

