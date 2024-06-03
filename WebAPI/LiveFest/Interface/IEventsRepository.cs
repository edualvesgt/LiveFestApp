using LiveFest.Domains;

namespace LiveFest.Interface
{
    public interface IEventsRepository
    {
        public void Register(Events events);

        public Events GetById(Guid id);

        public List<Events> GetAll();

        public List<Events> GetByCategory(Guid CategoriesID);

        void DeleteEvent(Guid id);
    }
}
