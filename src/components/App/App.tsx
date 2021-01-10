import React, {useState , useEffect, useContext} from 'react';
import {AnswerContext, QuestionContext, AllQuestionFormat} from '../../types'
import {getQuestions} from '../../apiCalls'
import {Switch, Route, __RouterContext} from 'react-router'
import { useTransition, animated} from 'react-spring'
//components
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Journey from '../Journey/Journey';
import {Survey} from '../Survey/Survey';
import {Question} from '../Question/Question';
import GenerateReport from '../GenerateReport/GenerateReport';
import Report from '../Report/Report'
import Error from '../Error/Error';
import { Cube } from '../Cube/Cube';
//create interface for context

const App:React.FC = () =>{

  const [questions, updateQuestions] = useState<any>({});
  const [answers, updateAllAnswers] = useState<any>({});
  const { location } = useContext<any>(__RouterContext)
  const transitions = useTransition(location, location => location.pathname, {
    from: {opacity: 0, transform:'translate(100%, 0)'},
    enter: {opacity: 1, transform:'translate(0%, 0)'},
    leave: {opacity: 0, transform:'translate(-50%, 0)'},
  })

  const buildAnswers = (questions: AllQuestionFormat | {}): {} => {
    const answerKey = Object.keys(questions).reduce((acc: any,cur)=>{
        acc[cur] = ''
        return acc
      },{})
      updateAllAnswers(answerKey)
      return questions
  }

  useEffect(() => {
    getQuestions().then((data) => buildAnswers(data) ).then((data) => updateQuestions(data))
  }, []);

  // let currentQuestion = Object.keys(questions).find(question => !answers[question])
  return (
    <QuestionContext.Provider value={questions}>
      <AnswerContext.Provider value={answers}>
        <NavBar/>
        {transitions.map(({item, props, key}) => (
          <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/journey" component={Journey}/>
            <Route exact path="/survey" component={Survey}/>
            <Route exact path="/question" component={()=><Question
              updateAllAnswers={updateAllAnswers}/>}/>
            <Route exact path="/generate_report" component={GenerateReport}/>
            <Route exact path="/submit" GenerateReport/>
            <Route exact path="/report" component={Report} />
            <Route path='/*' component={Error}/>
          </Switch>
            <Cube/>
          </animated.div>
        ))}

      </AnswerContext.Provider>
    </QuestionContext.Provider>
  );
}
export default App;
