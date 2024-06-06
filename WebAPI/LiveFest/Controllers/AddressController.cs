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
        private IAddressRepository _addressRepository;
        public AddressController()
        {
            _addressRepository = new AddressRepository();
        }

        [HttpPost]

        public IActionResult Register(Address address)
        {
            try
            {
                _addressRepository.Register(address);
                return StatusCode(201, address);
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
                Address searchedAddress = _addressRepository.GetById(id);

                return Ok(searchedAddress);
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
                return Ok(_addressRepository.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
