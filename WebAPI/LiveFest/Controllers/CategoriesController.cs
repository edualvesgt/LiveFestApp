using LiveFest.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LiveFest.Domains;

using LiveFest.Repository;
using Microsoft.Extensions.Logging;

namespace LiveFest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private ICategoriesRepository categoriesRepository;

        public CategoriesController() 
        { 
            categoriesRepository = new CategoriesRepository();  
        }

        [HttpPost]

        public IActionResult CreateCategory(Categories categories)
        {
            try 
            { 
                categoriesRepository.CreateCategory(categories);
                return StatusCode(201, categories);
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
                Categories searchedCategories = categoriesRepository.GetById(id);

                return Ok(searchedCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(categoriesRepository.GetAll());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
