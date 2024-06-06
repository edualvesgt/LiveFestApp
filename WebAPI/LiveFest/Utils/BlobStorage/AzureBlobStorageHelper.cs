using Azure.Storage.Blobs;
using Org.BouncyCastle.Tls;

namespace LiveFest.Utils.BlobStorage
{
    public class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
            try
            {
                //verifica se existe o arquivo
                if (arquivo != null)
                {
                    //gerar um nome único para a imagem
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);
                    //cira uma instÂncia do BlobServiceClient passando a string de conexão com o serviço de blob da azure
                    var blobServiceClient = new BlobServiceClient(stringConexao);

                    //obtém dados do container client
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

                    //obtém um blobClient usando o blob name
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //abre o fluxo de entrada do arquivo(foto)
                    using (var stream = arquivo.OpenReadStream())
                    {
                        //carrega o arquivo(foto) para o blob de forma assíncrona
                        await blobClient.UploadAsync(stream, true);
                    }
                    //retorna a uri do blob como uma string
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //retorna uri de uma imagem padrão caso nenhuma imagem seja enviada na requisição
                    return "<>";
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }

