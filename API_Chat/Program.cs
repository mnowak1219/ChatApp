// Initialization
using API_Chat.Hubs;
using Chat;
using Chat.Database;
using Chat.Domain;
using Chat.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder();

// This method gets called by the runtime. Use this method to add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddAuthentication();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "chat-cookie";
    options.Cookie.HttpOnly = false;
});
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(config =>
{
    config.SignIn.RequireConfirmedEmail = true;
}).AddEntityFrameworkStores<ApplicationDbContext>()
  .AddDefaultTokenProviders();
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 8;
    options.Password.RequiredUniqueChars = 1;
});
builder.Services.AddTransient<IMessagesRepository, MessagesRepository>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddSignalR();
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options =>
    options.AddPolicy("FrontEndClient", policyBuilder =>
    {
        policyBuilder.AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins(builder.Configuration["AllowedOrigins"]);
    }));
builder.Services.AddSwaggerGen();
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ChatClientApp/dist";
});
builder.Services.BuildServiceProvider().GetRequiredService<ApplicationDbContext>().Database.EnsureCreated();

// Building application
var app = builder.Build();

// Methods called by the runtime
app.UseHttpsRedirection();
app.UseCors("FrontEndClient");
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "API Chat");
    //options.RoutePrefix = string.Empty;
});
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.MapHub<ChatHub>("/chatHub");
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ChatClientApp";
    if (builder.Environment.IsDevelopment())
    {
        spa.UseAngularCliServer(npmScript: "start");
    }
});

// Running application
app.Run();