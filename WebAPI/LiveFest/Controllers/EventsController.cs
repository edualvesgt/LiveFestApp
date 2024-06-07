using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using System.Collections.Generic;
<<<<<<< HEAD
using LiveFest.ViewModel;
using WebAPI.Utils.BlobStorage;
=======
using Microsoft.EntityFrameworkCore;
using LiveFest.Context;
>>>>>>> origin/eduardo


namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventsRepository _eventsRepository;

        private readonly LiveFestContext _context;
        public EventsController(LiveFestContext context)
        {
            _eventsRepository = new EventsRepository();

            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm] EventsViewModel eventsViewModel)
        {
            try
            {
                var connectionString = "DefaultEndpointsProtocol=https;AccountName=livefest;AccountKey=hPfSZuVQkW+OmMErpfazV12pGybw2sEUozDqWzhDZ7rnPjANp5+szhoAeRZgxcAH3wq7KZeJfeg7+AStyUC1Lg==;EndpointSuffix=core.windows.net";
                var containerName = "bloblivefestcontainer";

                // Upload the image to Azure Blob Storage and get the URL
                var imageUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(eventsViewModel.Arquivo!, connectionString, containerName);

                // Ensure Date is not null or provide a default value
                var eventDate = eventsViewModel.Date ?? DateTime.Now;  // Provide a default value if null

                // Create a new Events object and populate it with data from the ViewModel
                var events = new Events
                {
                    CategoriesID = eventsViewModel.CategoriesID,
                    AddressID = eventsViewModel.AddressID,
                    EventName = eventsViewModel.EventName,
                    Date = eventDate,
                    Email = eventsViewModel.Email,
                    PhoneNumber = eventsViewModel.PhoneNumber,
                    Photo = imageUrl
                };

                _eventsRepository.Register(events);

                return StatusCode(201, events);
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
                Events searchedEvents = _eventsRepository.GetById(id);

                return Ok(searchedEvents);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("GetByCategory")]
        public IActionResult GetByCategory(Guid CategoriesID)
        {
            try
            {
                List<Events> eventsByCategory = _eventsRepository.GetByCategory(CategoriesID);

                return Ok(eventsByCategory);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_eventsRepository.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(Guid id)
        {
            try
            {
                _eventsRepository.DeleteEvent(id);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        
        
    }
}

