using LiveFest.Context;
using LiveFest.Domains;
using LiveFest.Interface;

namespace LiveFest.Repository
{
    public class SaveEventsRepository : ISaveEventsRepository
    {
        public LiveFestContext ctx = new LiveFestContext();
        public List<SaveEvents> GetAll()
        {
            return ctx.SaveEvents.ToList();
        }
    }
}
