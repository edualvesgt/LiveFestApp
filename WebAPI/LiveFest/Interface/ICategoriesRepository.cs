using LiveFest.Domains;

namespace LiveFest.Interface
{
    public interface ICategoriesRepository
    {
        public void CreateCategory(Categories categories);

        public Categories GetById(Guid id);

        public List<Categories> GetAll();
    }
}