using LiveFest.Domains;
using Microsoft.Extensions.Logging;

namespace LiveFest.Interface
{
    public interface IEventsRepository
    {
        public void Register(Events events);

        public Events GetById(Guid id);

        public List<Events> GetAll();

        public List<Events> GetByCategory(Guid CategoriesID);
        void DeleteEvent(Guid id);

        Task<IEnumerable<Events>> GetNearbyEvents(decimal latitude, decimal longitude, decimal radiusInKilometers);
    }
}
