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
            var events = (from e in ctx.Events
                          join a in ctx.Address on e.AddressID equals a.ID
                          join c in ctx.Categories on e.CategoriesID equals c.ID
                          select new Events
                          {
                              ID = e.ID,
                              EventName = e.EventName,
                              Date = e.Date,
                              Email = e.Email,
                              PhoneNumber = e.PhoneNumber,
                              Photo = e.Photo,
                              Description = e.Description,
                              Organizer = e.Organizer,
                              AddressID = e.AddressID,
                              Address = a,
                              CategoriesID = e.CategoriesID,
                              Categories = c
                          }).ToList();

            return events;
        }

        public List<Events> GetByCategory(Guid CategoriesID)
        {
            try
            {
                List<Events> categoryList = ctx.Events
                    .Where(x => x.CategoriesID  == CategoriesID)
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

        public Task<IEnumerable<Events>> GetNearbyEvents(decimal latitude, decimal longitude, decimal radiusInKilometers)
        {
            throw new NotImplementedException();
        }
    }
}
