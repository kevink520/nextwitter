


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kevink520/nextwitter">
  <h3 align="center">nextwitter</h3>
  </a>

  <p align="center">
    A microblogging social app inspired by Twitter and based on a project in Flavio's Advanced Bootcamp
    <br />
    <br />
    <a href="https://nextwitter.vercel.app">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

I build Next.js apps with Headless WordPress at work, and I wanted to be really good at what I do. So I enrolled in <a href="https://flaviocopes.com/">Flavio Copes</a>' Advanced Bootcamp. 

This is based on a project in the Advanced Bootcamp, and I added many extra features.

* Added colors and implemented dark mode.
* Added replies count.
* Detected if a user already exists at account creation and detected if a user doesn't exist at profile page visit.
* Enabled users to like a tweet and displayed likes count.
* Added Load More pagination on the user profile page.
* Allowed users to delete their own replies.
* Redirected from every other page to the main page for non-logged-in users.
* Disabled links in the main page tweets for non-logged-in users.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* ![Prisma](https://img.shields.io/static/v1?style=for-the-badge&message=Prisma&color=2D3748&logo=Prisma&logoColor=FFFFFF&label=)
* ![Railway](https://img.shields.io/static/v1?style=for-the-badge&message=Railway&color=0B0D0E&logo=Railway&logoColor=FFFFFF&label=)
* ![PostgreSQL](https://img.shields.io/static/v1?style=for-the-badge&message=PostgreSQL&color=4169E1&logo=PostgreSQL&logoColor=FFFFFF&label=)
* ![Vercel](https://img.shields.io/static/v1?style=for-the-badge&message=Vercel&color=000000&logo=Vercel&logoColor=FFFFFF&label=)
* ![Tailwind CSS](https://img.shields.io/static/v1?style=for-the-badge&message=Tailwind+CSS&color=222222&logo=Tailwind+CSS&logoColor=06B6D4&label=)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kevink520/nextwitter.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your environmental variables in `.env`
   ```sh
   DATABASE_URL="postgresql://postgres:xxxxxxxxxxxx@xxxxxxxxxxxxxxxxxx.railway.app:7090/railway"
   EMAIL_SERVER=smtp://xxxxx@xxxxxxxx.xxx:xxxxxxxxxxxxxxxx@xxxxxxx.xxxxxxxx.xxx:587
   EMAIL_FROM=XXXXX XXXXX <xxxxx@xxxxxxxxx.xxx>
   NEXTAUTH_URL=http://localhost:3000
   SECRET=xxxxxxxxxxxxxxxxxxxxx
   ```
4. Run the app locally
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Kevin Kim - [https://www.linkedin.com/in/kevin-kim-73b607125/](https://www.linkedin.com/in/kevin-kim-73b607125/)

Project Link: [https://github.com/kevink520/nextwitter](https://github.com/kevink520/nextwitter)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Flavio Copes helped me to become a better developer.

* [flaviocopes.com](https://flaviocopes.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[PostgreSQL]: https://img.shields.io/static/v1?style=for-the-badge&message=PostgreSQL&color=4169E1&logo=PostgreSQL&logoColor=FFFFFF&label=
[Prisma]: https://img.shields.io/static/v1?style=for-the-badge&message=Prisma&color=2D3748&logo=Prisma&logoColor=FFFFFF&label=
[Railway]: https://img.shields.io/static/v1?style=for-the-badge&message=Railway&color=0B0D0E&logo=Railway&logoColor=FFFFFF&label=
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vercel]: https://img.shields.io/static/v1?style=for-the-badge&message=Vercel&color=000000&logo=Vercel&logoColor=FFFFFF&label=
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Tailwind CSS]: https://img.shields.io/static/v1?style=for-the-badge&message=Tailwind+CSS&color=222222&logo=Tailwind+CSS&logoColor=06B6D4&label=
