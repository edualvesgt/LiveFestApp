using LiveFest.Domains;

namespace LiveFest.Interface
{
    public interface ISaveEventsRepository
    {

        //    public void Register(SaveEvents saveEvents);

        //    public SaveEvents GetById(Guid id);

        public List<SaveEvents> GetAll();
    }
}
