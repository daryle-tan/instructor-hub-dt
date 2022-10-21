import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import overallStyles from "../../../styles/CohortOverall.module.css";
import UpdateModal from "./UpdateModal";
import { studentsState, cohortsState, currentCohortState, groupsState } from "../../state.js";
import { useRecoilState } from "recoil";
import UpdateProjectsModal from "./UpdateProjectsModal";
import UpdateAssessmentsModal from './UpdateAssessmentsModal';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const CohortOverall = ({ children }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);
  const [showUpdateAssessmentModal, setShowUpdateAssessmentModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [students, setStudents] = useRecoilState(studentsState)
  const [cohortAvg, setCohortAvg] = useState(0)
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [groups, setGroups] = useRecoilState(groupsState)
  // const [groupsDivs, setGroupsDivs] = useState('')
 
  const studentsInCohort = students.filter(student => student.cohort === currentCohort) 
  const currentClass = cohorts.filter(classNow => classNow.name === currentCohort)
 
// function to get cohort average
    useEffect(() => {  
      currentClass.map((cohort) => {
      if (cohort.cohort_id) {
       setCohortAvg(cohort.cohort_avg)
      }
      })
      // }
    }, [currentCohort])
// function to get tech average
  const techAvg = () => {
    let sum = 0;
    studentsInCohort.map((student) => (
      sum += student.tech_avg
    ))
    let avg = sum /studentsInCohort.length
    return (avg / 4) * 100;
  }
  //function to get team average
  const teamworkAvg = () => {
    let sum = 0;
    studentsInCohort.map((student) => (
      sum += student.teamwork_avg
    ))
    let avg = sum / studentsInCohort.length
    return (avg / 4) * 100;
  }

  const openUpdateModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const openUpdateProjectModal = () => {
    setShowUpdateProjectModal((prev) => !prev);
  };

  const openUpdateAssementModal = () => {
    setShowUpdateAssessmentModal((prev) => !prev);
  };


  // *The GRAPH - using ChartJS, we want it to be
  // dynamic, responsive to changes in the
  // cohort averages.
  // *Need to make sure I'm bringing in averaged data
  // for cohorts as state, I think.
  // *Graph as its own sub-component?
  // let techAvg = []
  // let teamAvg = []
  // let sum = 0;
  // for (let i = 0; i <= students.length; i++) {
  //   let techId = students[i].tech_avg;
  //   sum += techId
  // }

  const options = {
   
    
    // "x" by default, setting to "y" makes the graph horizontal
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    // auto-scales by default, defining min max to not be stupid
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    //"responsive" graph
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        display: true,
      },
      title: {
        display: false,
        text: "Cohort Averages",
      },
    },
  };

  const data = {
    labels: ["Cohort Averages"],
    datasets: [
      // {
      //   label: "Cohort Avg",
      //   data: [cohortAvg],
      //   borderColor: "black",
      //   backgroundColor: ["green"],
      // },
      {
        label: "Tech Avg",
        data: [techAvg()],
        borderColor: "black",
        backgroundColor: ["rgba(53, 162, 235, 0.5"],
      },
      {
        label: "Team Avg",
        data: [teamworkAvg()],
        borderColor: "black",
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
    hoverOffset: 4,
  };

  return (
    <div className={overallStyles.overallBorder}>
      <div className={overallStyles.graphContainer}>
        <div className={overallStyles.barHolder}>
          <Bar data={data} options={options} width={100} height={200} />
        </div>
      </div>
      <div className={overallStyles.btnContainer}>
        <div className={overallStyles.textContent}>
          <div className={overallStyles.link}>
            <u onClick={openUpdateModal}>Weekly Update</u>
          </div>
          <UpdateModal
            showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpdateModal}
            onClose={() => {
              setShowUpdateModal(false);
            }}/>
          <div className={overallStyles.link}>
            <u onClick={openUpdateProjectModal}>Projects Update</u>
          </div>
          <UpdateProjectsModal
            showUpdateProjectModal={showUpdateProjectModal}
            setShowUpdateProjectModal={setShowUpdateProjectModal}
            onClose={() => {
              setShowUpdateProjectModal(false);
            }}/>
          <div className={overallStyles.link}>
            <u onClick={openUpdateAssementModal}>Assessments Update</u>
          </div>
          <UpdateAssessmentsModal
            showUpdateAssessmentModal={showUpdateAssessmentModal}
            setShowUpdateAssessmentModal={setShowUpdateAssessmentModal}
            onClose={() => {
              setShowUpdateAssessmentModal(false);
            }}/>
        </div>
        <div className={overallStyles.link}>
            <u>Groups</u>
        </div>
          <div className={overallStyles.groups}>
              {groups ? (
                // console.log(Object.values(groups).map())
                Object.values(groups).map((group) => {
                  // {console.log(group)}
                  return <div key={group[0].name}>{group.join(', ')}</div>
                })
                ) : ('')}
          </div>
      </div>
    </div>
  );
};

export default CohortOverall;