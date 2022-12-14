import style from '../../../styles/StudentStatsRight.module.css'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {useEffect, useState} from 'react'
import { studentTechSkillsState, studentTeamworkSkillsState, studentIdState, currentlearnAndLearnGradesState } from "../../state";
import { useRecoilState } from 'recoil';
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatusRight = ({currentStudent}) => { 
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [studentTechSkills, setStudentTechSkills] = useRecoilState(studentTechSkillsState);
  const [studentTeamworkSkills, setStudentTeamworkSkills] = useRecoilState(studentTeamworkSkillsState);


  const [teckSkill, setTeckSkill] = useState([]); 
  useEffect(() => {
    axios.get("/api/studentTeamworkSkills").then((res) => {
      setStudentTeamworkSkills(res.data.studentTeamworkSkills);
    });

    axios.get("/api/studentTechSkills").then((res) => {
      setStudentTechSkills(res.data.studentTechSkills);
    });
  },[studentId])

   let currTechSkills = studentTechSkills.filter(teckSkill => teckSkill.student_id == studentId); 
   let arrTeckSkills = currTechSkills.map((skill) => skill.score); 
   let currTeamSkills = studentTeamworkSkills.filter(teamSkill => teamSkill.student_id == studentId); 
   let arrTeamSkills = currTeamSkills.map((skill) => skill.score);

   let colPercent = (num) => {
    if (num === 1) {
      return "25%"
    }
    if (num === 2) {
      return "50%";
    }
    if (num === 3) {
      return "75%";
    }
    if (num === 4) {
      return "100%"
    }
  }



  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        // if we want multiple options then we can display true here
        position: 'bottom',
        align:'center',
      },
      title: {
        display: true,
        text: 'Progress Over time',
        font: {size: 15},
      },
    },
    scales: {
      x:{
        grid:{
          display: false,
        }
      },
    }
  };

  const labels = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const data = {
    labels,
    datasets: [
      {
        label: 'TECH SKILLS',
        data: arrTeckSkills,
        borderColor: 'darkgreen',
        backgroundColor: 'green',
        tension: 0.4, 
        // pointRadius: 1, 
      },
      {
        label: 'TEAM SKILLS',
        data: arrTeamSkills,
        borderColor: 'darkblue',
        backgroundColor: 'blue',
        tension: 0.5, 
        // pointRadius: 1, 
      },
    ],
  };
  
  return (
    <div className={style.container}>
      <div className={style.graphCon}>
        <Line className={style.graph}  options={options} data={data} />
      </div>
      <div className={style.avrgScoreCon}>
        <div className={style.averages}>
          <span>Tech Avg</span>
          {currentStudent.tech_avg ?   
            <div className={style.avgScores} >{colPercent(currentStudent.tech_avg)}</div>
            :  <div className={style.avgScores} > -- </div>
          }
        </div>
        <div className={style.averages}>
          <span>Learn Avg</span>
          { currentStudent.learn_avg ?
            <div className={style.avgScores} >{currentStudent.learn_avg}%</div>
            : <div className={style.avgScores}> -- </div>
          }
        </div>
        <div className={style.averages}>
          <span>TeamWork Avg</span>
          {currentStudent.teamwork_avg ?
            <div className={style.avgScores} >{colPercent(currentStudent.teamwork_avg)}</div>
            : <div className={style.avgScores} > -- </div>
          }
        </div>
      </div>
    </div>
  )
}

export default StatusRight
