using LiveFest.Domains;
using LiveFest.Interface;
using LiveFest.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private IAddressRepository addressRepository;
        public AddressController()
        {
            addressRepository = new AddressRepository();
        }

        [HttpPost("CadastroDeEndereco")]

        public IActionResult Register(Address address)
        {
            try
            {
                addressRepository.Register(address);
                return StatusCode(201, address);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("BuscarPorId")]

        public IActionResult GetById(Guid id)
        {
            try
            {
                Address searchedAddress = addressRepository.GetById(id);

                return Ok(searchedAddress);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("Todos")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(addressRepository.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
