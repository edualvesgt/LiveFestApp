using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using LiveFest.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Utils.BlobStorage;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvaluationsController : ControllerBase
    {
        private IEvaluationsRepository _evaluationRepository;

        public EvaluationsController()
        {
            _evaluationRepository = new EvaluationsRepository();
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm] EvaluationViewModel evaluationViewModel)
        {
            try
            {
                var connectionString = "DefaultEndpointsProtocol=https;AccountName=livefest;AccountKey=hPfSZuVQkW+OmMErpfazV12pGybw2sEUozDqWzhDZ7rnPjANp5+szhoAeRZgxcAH3wq7KZeJfeg7+AStyUC1Lg==;EndpointSuffix=core.windows.net";
                var containerName = "bloblivefestcontainer";

                // Upload the image to Azure Blob Storage and get the URL
                var imageUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(evaluationViewModel.Arquivo!, connectionString, containerName);

                // Create a new Evaluation object and populate it with data from the ViewModel
                var evaluation = new Evaluation
                {
                    EventsID = evaluationViewModel.EventsID,
                    Description = evaluationViewModel.Description,
                    Photo = imageUrl,
                    UserID = evaluationViewModel.UserID
                    // Add other properties as needed
                };

                _evaluationRepository.Register(evaluation);

                return StatusCode(201, evaluation);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("GetById")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                Evaluation searchedEvaluation = _evaluationRepository.GetById(id);

                return Ok(searchedEvaluation);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("GetByEvent")]
        public IActionResult GetByEvent(Guid EventsID)
        {
            try
            {
                List<Evaluation> evaluationByEvent = _evaluationRepository.GetByEvent(EventsID);
                return Ok(evaluationByEvent);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
