using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using saving_app.Models;

namespace saving_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GetGoalsController : Controller
    {   
        private string _getUserId(System.Security.Claims.ClaimsPrincipal user)
        {
            var userId = user.Claims.First(f => f.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            return userId;
        }
        private SavingGoalContext db;
        public GetGoalsController()
        {
            this.db= new SavingGoalContext();
        }
    [HttpGet]
    public async Task<ActionResult<List<SavingGoal>>> GetGoals()
    {
        var results = this.db.SavingGoal.OrderBy(goal => goal.Id);
        return await results.ToListAsync();
    }
    }
}
