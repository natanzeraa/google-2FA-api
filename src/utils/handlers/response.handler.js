export const handleResponse = async (res, serviceCall) => {
  try {
    const response = await serviceCall
    return res.status(response.status).json(response)
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message || 'Erro interno no servidor'
    })
  }
}