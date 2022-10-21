import style from '../styles/About.module.css'
import Image from 'next/image'
import NavBar from '../components/main_page/NavBar'
const about = () => {
  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.header}>
          <h2>Meet The Team</h2>
        </div>
        <div className={style.subContainer}>
          <div className={style.team}>
            <Image src='/Alex.jpg' height={200} width={200}/>
            {/* <img className={style.img} alt='team member' src='/pic1.jpg'/> */}

            <div className={style.name}>Alexander Cobble</div>
            <div className={style.about}>
              {"Project Manager"}<br/>
              {"A full-stack software engineer with endless curiosity, and a love for animals. My passion for learning drives me ever forward in the path I pursue."}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/A-Cobble'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/alexandercobble/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src="/ZiR.jpg" height={200} width={200} />
            <div className={style.name}>Zachary Hudson</div>
            <div className={style.about}>
              {"Orchestrated component interconnectivity within the project. Driven by wanderlust, technology is my passion."}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/Self-Zachtualization'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/zacharychudson/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/Gerard.jpg' height={200} width={200}/>

            <div className={style.name}>Gerard San Juan</div>
            <div className={style.about}>
            {"Hi, I'm Gerard! I pursue software engineering to hopefully one day help humanity push the limits of its own existence. I also love anime very much."} 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/Tiwala'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/gerard-san-juan-ab8554162/'>
                <Image alt="Linkedin Icon"src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/Michael.png' height={200} width={200}/>

            <div className={style.name}>Michael Jefferson</div>
            <div className={style.about} >
              {"Full-stack Software Engineer, Cyber and Intelligence Analyst with several years of experience working in DoD and Intelligence Community support roles. Knowledgeable and experienced in both Javascript and cloud app deployment."}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/heymj317'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/--michaeljefferson/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src="/daryle.jpg" height={200} width={200} />

            <div className={style.name}>Daryle Tan</div>
            <div className={style.about}>
            {"I got into software development because of my interest in the cryptocurrency industry. I enjoy creating and building applications."}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/daryle-tan'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/daryle-tan/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src='/Charles.jpg' height={200} width={200}/>

            <div className={style.name}>Charles Vitanza</div>
            <div className={style.about} >
              {"I am an inspiring software engineer who recently transitioned from the Air Force with the dream of eventually working in the video game industry"} 
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/BlazingAces'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/charles-a-vitanza/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src="/Mike.jfif" height={200} width={200} />
            <div className={style.name}>Mike Cohen</div>
            <div className={style.about}>
              {"Mike is a Full-Stack Developer and US Army Veteran. He is creatively inclined, and lives outside of the box."}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/mbcohen777'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='#'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src="/Sam.jpg" height={200} width={200} />

            <div className={style.name}>Samuel Chavez</div>
            <div className={style.about}>
              {"I naturally like building things and problem solving so coding is a perfect fit. I also like being with my family and working in software is something that, lately, is able to cater to remote work."}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/SamChav'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/samuel-i-chavez/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src="/Martha.png" height={200} width={200} />
            <div className={style.name}>Martha Martin</div>
            <div className={style.about}>
              {"I enjoy bringing people's visions to life, and being a software engineer allows me to express my creativity. I enjoy the challenge and growth in this career field."}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/mmartin440'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/martha-martin-pablo/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
          <div className={style.team}>
            <Image src="/Randy.jfif" height={200} width={200} />
            <div className={style.name}>Randy Fernandez</div>
            <div className={style.about}>
              {"'Intelligent and multi-talented, Randy is a great person and a valuable asset to any team.'"} 
              <br/> 
              {"- Gerard San Juan"}
            </div>
            <div className={style.socialLink}>
              <a className={style.links} href='https://github.com/RRFernandez'>
                <Image alt="GitHub Icon" src='/GitHubIcon.png' width={48} height={48}></Image>
              </a>
              <a className={style.links} href='https://www.linkedin.com/in/randyrfernandez/'>
                <Image alt="Linkedin Icon" src='/LinkedinIcon.png' width={48} height={48}></Image>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default about