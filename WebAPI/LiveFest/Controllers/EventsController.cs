using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;


namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IEventsRepository eventsRepository;

        public EventsController()
        {
            eventsRepository = new EventsRepository();
        }

        [HttpPost("CriacaoDeUsuario")]
        public IActionResult Post(Events events)
        {
            try
            {
                eventsRepository.Register(events);

                return StatusCode(201, events);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("Todos")]
        public IActionResult Get()
        {
            try
            {
                return Ok(eventsRepository.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }






        //[HttpGet("ConsultasPaciente")]
        //public IActionResult GetByIdPatient()
        //{
        //    try
        //    {
        //        Guid idUsuario = Guid.Parse(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

        //        List<Consulta> consultas = consultaRepository.ListarPorPaciente(idUsuario);
        //        return Ok(consultas);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}


        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                Events searchedEvents = eventsRepository.GetById(id);

                return Ok(searchedEvents);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
