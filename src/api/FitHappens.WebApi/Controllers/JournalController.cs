using FitHappens.Repository.Account.Abstractions;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
using Microsoft.AspNetCore.Mvc;

namespace FitHappens.WebApi.Controllers
{
    [Route("api/journal")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly IUserService userService;

        public JournalController(IUserService userService)
        {
            this.userService = userService;
        }

        [ApiKey]
        [HttpGet(Name = "GetJournal")]
        public IActionResult Get()
        {
            var key = Request.Headers["X-Api-Key"].ToString();
            var userId = userService.GetIdForKey(key);

            return Ok();
        }
    }
}
