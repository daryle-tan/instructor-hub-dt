import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
        usersState,
        studentsState,
        currentCohortState,
        learnState,
        currentStudentState,
        currentlearnAndLearnGradesState,
        projectsState,
        learnGradesState,
      } from "../../state";
import styles from "../../../styles/UpdateModal.module.css";
import axios from 'axios'
import style from '../../../styles/UpdateAssessments.module.css'

const UpdateAssessmentsModal = ({ showUpdateAssessmentModal, setShowUpdateAssessmentModal, onClose }) => {
  // What student is being updated at this moment
  const [currStudent, setCurrStudent] = useState(0);
  // This is derived state -- updated at same time as currStudent, one derives the other
  const [indexedStudent, setIndexedStudent] = useState({});
  const [modal, setModal] = useState(false);
  // This is a rough draft idea, probably obscelesced by simply POSTing each student to Asana
  const [stagedCohort, setStagedCohort] = useState([]);
  // Merely to identify who is making the update, and possibly selecting the students of the user's default cohort
  const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState);
  const [user, setUser] = useRecoilState(usersState);
  // Unless this is replaced by some "selected students" state, or "current cohort" state, this determines how the updater iterates
  // (by going through the students)
  const [students, setStudents] = useRecoilState(studentsState);
  // This lets us use a ref hook to grab the first Select input and refocus it on form submission
  const firstInput = useRef(null);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [currentLearnAndLearnGrades, setCurrentLearnAndLearnGrades] = useRecoilState(currentlearnAndLearnGradesState)
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [users, setUsers] = useRecoilState(usersState);
  const [newAssessName, setNewAssessName] = useState(''); 
  const [score, setScore] = useState('100'); 
  // const [projNotes, setAssessNotes] = useState(''); 
  const [assess, setAssess] = useState({}); 
  const [learn, setLearn] = useRecoilState(learnState);
  const [addAssessName, setAddAssessName] = useState(false);
  const [learnGrades, setLearnGrades] = useRecoilState(learnGradesState)

  // How to use this in relation to a stupid modal?
  // Try to cut out the middleman -- only need currStudent or indexedStudent, not both
  useEffect(() => {
    if (course[currStudent]) {
        setIndexedStudent(course[currStudent]);
    }
  }, [currStudent, currentCohort]); 
  
  
  // Filters students to be updated by matching their cohort value to currentCohort's name
  let course = students.filter((classRoom) => classRoom.cohort === currentCohort);

  // To reset the indexer value if modal is closed early
  onClose = () => {
    setCurrStudent(0);
    setShowUpdateAssessmentModal(false);
    setAddAssessName(false)
    setScore('100')
  };

  const prevStudent = () => {
    setCurrStudent((prev) => {
      if (prev !== 0) {
        return prev - 1;
      } else {
        return 0;
      }
    });
  };

  const nextStudent = () => {
    setCurrStudent((prev) => {
      return prev + 1;
    });
  };

  // this grade is set in the input element
//   let grade = score
//     let assessmentId = Number(projSelected)
    let assessmentId = Number(assess.value)
    let assessScore = Number(score)
 // post assessment_name to request to learn table
    const onSubmiting = (e) => {
      e.preventDefault()
        let currentAssessment = learn.find((test) => test.assessment_name === newAssessName)
        if(currentAssessment === undefined && addAssessName){
          axios.post("/api/learn", {
            "assessment_name": newAssessName, 
          }).then((res) => {
            setAssess(res.data.assessment_id)
            setLearn((prev) => [...prev, res.data]);
            setCurrStudent(prev => prev + 1 )
          }).then(submitHandler(e))
        }
        submitHandler(e)
      }

  // enterListener only necessary because the Notes input is a textarea, and "Enter" is used by default for newline
  const submitHandler = async (e) => {
    e.preventDefault();   
    setAddAssessName(false)
    // post request to local database
    try {
      await axios.post('/api/learnGrades', {
        "student_id": indexedStudent.student_id,
        "assessment_id": assessmentId,
        "assessment_grade": assessScore,
      }).then((res) => setLearnGrades((prev)=> [...prev, ...res.data]))
    } 
    catch(error) {     
      console.log("from catch")
    } 
    // increments to the next student
    setCurrStudent((prev) => {
      if (prev < course.length) {
        return prev + 1;
      } else {
        return 0;
      }
    })
    enterListener(e);
  };

  const enterListener = (e) => {
    e.preventDefault();
    let instructorNotes = ''
    if(!addAssessName) {
      axios.get(`https://app.asana.com/api/1.0/tasks/${indexedStudent.gid}`, {
        headers: {
          Authorization: `Bearer ${users.asana_access_token}`,
        }
      })
      .then((res) => {
        instructorNotes = res.data.data.notes
      })
      // Once you gotten your previews notes in Asana it checks the if there was previews note is empty or not to add <u> tag as the title 
      
      .then(() => {
        !instructorNotes.length ? instructorNotes = "<u>Test Name: Test Score</u>" : null
        // Once it checks it then it will do a put request to Asana 
      
        axios({
          method: "PUT", //must be put method not patch
          url: `https://app.asana.com/api/1.0/tasks/${indexedStudent.gid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this LOCAL DB NEEDED
          headers: {
            Authorization: `Bearer ${users.asana_access_token}`,  //need template literal for ALLLLL headers so global state dependant on user
          }, 
          data: { 
            data: {
              "workspace": "1213745087037",
              "assignee_section": null,
              "html_notes": `<body>${instructorNotes}\n ${(assess[assess.selectedIndex].textContent).toUpperCase()}: ${assessScore}</body>`, //need conditional or neeed to make this field mandatory
              "parent": null,
              "resource_subtype": "default_task",
            }
          }
        })
      })
    setScore('100')
    firstInput.current.focus();
    } else {
      axios.get(`https://app.asana.com/api/1.0/tasks/${indexedStudent.gid}`, {
      headers: {
        Authorization: `Bearer ${users.asana_access_token}`,
      }
    })
    .then((res) => {
      instructorNotes = res.data.data.notes
    })
    // Once you gotten your previews notes in Asana it checks the if there was previews note is empty or not to add <u> tag as the title 
    
    .then(() => {
      !instructorNotes.length ? instructorNotes = "<u>Test Name: Test Score</u>" : null
      // Once it checks it then it will do a put request to Asana 
      axios({
        method: "PUT", //must be put method not patch
        url: `https://app.asana.com/api/1.0/tasks/${indexedStudent.gid}`, //need task id variable -- sooo...this student gid needs to be filled when the student is selected, need to correlate between this LOCAL DB NEEDED
        headers: {
          Authorization: `Bearer ${users.asana_access_token}`,  //need template literal for ALLLLL headers so global state dependant on user
        }, 
        data: { 
          data: {
            "workspace": "1213745087037",
            "assignee_section": null,
            "html_notes": `<body>${instructorNotes}\n ${newAssessName.toUpperCase()}: ${assessScore}</body>`, //need conditional or neeed to make this field mandatory
            "parent": null,
            "resource_subtype": "default_task",
          }
        }
      })
    })
    setScore('100')
    setAddAssessName(false)
  }
  };


  return (
    <>
      {showUpdateAssessmentModal ? (
        <>
          <div className={styles.modalOverlay} onClick={onClose} />
          <div className={styles.UpdateModal}>
            <div className={styles.header}>
              Update -
              {course[currStudent]
                ? indexedStudent.name
                : "Assessment Update COMPLETE"}
              <button className={styles.button} onClick={onClose}>
                X
              </button>
            </div>
            <div className={styles.mainBodyCon}>
              <div>
                <span className={styles.arrows} onClick={prevStudent} disabled={currStudent === 0 ? true : false}>&#171;</span>
              </div>
              <div className={styles.update}>
                {course[currStudent] ? (
                <form className={styles.updateForm} onSubmit={(e) => onSubmiting(e)}>
                  <div className={styles.assesmentTitleCon }>
                    <label htmlFor="assessments">Assessments</label>
                    <div className={style.lableContainer}>
                    {/* <label className={style.labels}>Assesment</label> */}
                    <span onClick={() => setAddAssessName(!addAssessName)} className={styles.addBtn} >&#10009;</span>
                    </div>

                  </div>
                    {addAssessName ? 
                    <input className={styles.assessInput} onChange={(e) => setNewAssessName(e.target.value)}></input>     
                    :
                    <select id="assessments" name="assessments" required autoFocus={true} ref={firstInput}  onChange={(e)=>setAssess(e.target)}>
                    <option value="" selected disabled hidden>
                      Select an Option
                    </option>
                      {learn.map((assessment) => {
                            return (
                            <option key={assessment.assessment_id} value={assessment.assessment_id}>
                                {assessment.assessment_name}
                            </option>)
                        })}
                  </select>
                  }
                  <br />
                  <label htmlFor="Grade">Grade</label> <br />
                  <input  className={styles.option}  type="number" min="0" max="100" defaultValue="100" required onChange={(e) => {setScore(e.target.value)
                  }}></input>
                  {/* <span>%</span>  */}
                  <br />
                  {/* <label htmlFor="Notes">Notes</label> <br />
                  <textarea id="Notes" name="Notes" rows="10" cols="30" value={projNotes} required onChange={(e) => setAssessNotes(e.target.value)}></textarea> */}
                  <br />
                  <button type="submit"  value="Submit" onClick={(e) => onSubmiting(e)}>Submit</button>
                </form>
                
              //   onClick={(e) => onSubmit(e)
              ) : (
                <span>{`Go code with your buds, you're done`}</span>
              )}
              </div>
            <div>
              <span className={styles.arrows} onClick={nextStudent} disabled={currStudent === (course.length - 1) ? true : false}>&#187;</span>
            </div>
            </div>
            {/* <div className={styles.formFooter}>
              <button onClick={prevStudent} disabled={currStudent === 0 ? true : false}>
                Previous Student
              </button>
              <button onClick={nextStudent} disabled={currStudent === (course.length - 1) ? true : false}>
                Next Student</button>
            </div> */}
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateAssessmentsModal;

