using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace PremiumCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[EnableCors("AllowOrigin")]
    public class OccupationController : ControllerBase
    {
        protected static IList<Occupation> occupationList;
        protected static IList<OccupationRating> occupationRatingList;
        static OccupationController()
        {
            occupationList = new List<Occupation>()
        {
            new Occupation() { occupation = "Cleaner", rating = "Light Manual" },
            new Occupation() {  occupation = "Doctor", rating = "Professional" },
            new Occupation() { occupation = "Author", rating = "White Collar"},
            new Occupation() { occupation = "Farmer", rating = "Heavy Manual"},
            new Occupation() { occupation = "Mechanic", rating = "Heavy Manual" },
            new Occupation() { occupation = "Florist", rating = "Heavy Manual" }
        };
            occupationRatingList = new List<OccupationRating>()
        {
            new OccupationRating() { rating = "Professional", factor = 1.0 },
            new OccupationRating() {  rating = "White Collar", factor = 1.25 },
            new OccupationRating() { rating = "Light Manual", factor = 1.5},
            new OccupationRating() { rating = "Heavy Manual", factor = 1.75}           
        };

        }
        [HttpGet]
        [Route("GetAllOccupations")]
        public IEnumerable<Occupation> GetAllOccupations()

        {
            return occupationList;
        }

        [HttpGet]
        [Route("GetAllOccupationRatings")]
        public IEnumerable<OccupationRating> GetAllOccupationRatings()
        {
            return occupationRatingList;
        }

    }

    public class Occupation
    {
        public string occupation { get; set; }
        public string rating { get; set; }
    }
    public class OccupationRating
    {
        public string rating { get; set; }
        public double factor { get; set; }
    }



}