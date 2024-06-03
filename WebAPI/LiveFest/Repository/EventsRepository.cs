using LiveFest.Context;
using LiveFest.Domains;
using LiveFest.Interface;
using Microsoft.EntityFrameworkCore;

namespace LiveFest.Repository
{
    public class EventsRepository : IEventsRepository
    {
        public LiveFestContext ctx = new LiveFestContext();

        public void Register(Events address)
        {
            ctx.Events.Add(address);
            ctx.SaveChanges();
        }

        public Events GetById(Guid id)
        {
            try
            {
                return ctx.Events
                    .FirstOrDefault(x => x.ID == id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Events> GetAll()
        {
            return ctx.Events.ToList();
        }

        public List<Events> GetByCategory(Guid CategoriesID)
        {
            try
            {
                List<Events> categoryList = ctx.Events
                    .Where(x => x.CategoriesID != null && x.CategoriesID == CategoriesID)
                    .ToList(); 

                return categoryList;
            }
            catch (Exception)
            {
                throw;
            }

        }
        public void DeleteEvent(Guid id)
        {
            try
            {
                Events searchedEvents = ctx.Events.Find(id)!;

                if (searchedEvents != null)
                {
                    ctx.Events.Remove(searchedEvents);
                }

                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
