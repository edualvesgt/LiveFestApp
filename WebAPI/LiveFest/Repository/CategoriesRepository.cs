using LiveFest.Context;
using LiveFest.Domains;
using LiveFest.Interface;

namespace LiveFest.Repository
{
    public class CategoriesRepository : ICategoriesRepository
    {
        public LiveFestContext ctx = new LiveFestContext();
        public void CreateCategory(Categories categories)
        {
            ctx.Categories.Add(categories);
            ctx.SaveChanges();
        }

        public Categories GetById(Guid id)
        {
            try
            {
                return ctx.Categories.FirstOrDefault(x => x.ID == id);
            }
            catch(Exception)
            {
                throw;
            }
        }

        public List<Categories> GetAll()
        {
            return ctx.Categories.ToList();
        }
    }
}
