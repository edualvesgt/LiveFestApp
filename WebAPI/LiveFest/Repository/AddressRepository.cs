using LiveFest.Context;
using LiveFest.Domains;
using LiveFest.Interface;

namespace LiveFest.Repository
{
    public class AddressRepository : IAddressRepository
    {
        public LiveFestContext ctx = new LiveFestContext();
        public void Register(Address address)
        {
            ctx.Address.Add(address);
            ctx.SaveChanges();
        }

        public Address GetById(Guid id)
        {
            try
            {
                return ctx.Address.FirstOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Address> GetAll()
        {
            return ctx.Address.ToList();
        }

    }
}
