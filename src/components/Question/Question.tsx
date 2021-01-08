import React, { useState, useContext}  from 'react';
import {QuestionContext, AnswerContext} from '../../types';
import './Question.css'
import bkg_img from '../../images/questions/Big Shoes - Sitting On Floor.png'
import location_img from '../../images/questions/Charco - Location Map.png'

interface Props{
  updateAllAnswers: any;
  currentQuestion: string;
}
    export const Question: React.FC<Props> = ({updateAllAnswers, currentQuestion}) => {

    const answerContext = useContext(AnswerContext)
    const questionContext = useContext(QuestionContext)
    const [answerInput, updateAnswer] = useState<any>({question: '', answer: ''});

    let currentAnswer = Object.keys(answerContext).find(question => answerContext[question])
    let theQuestion = questionContext[currentQuestion]

    console.log(theQuestion)
    return (
      <section className='question-section'>
        
        <div className="inner-container">

          <div className='desc-container'>
            <div className="description-box">
              <h1 className="question-desc">{theQuestion?.attributes?.classification}</h1>
              <h2 className='desc'>{theQuestion?.attributes?.description}</h2>
              <h2 className='desc'>{theQuestion?.attributes?.information}</h2>
            </div>
          </div>
        
        <div className='question_img-box_1'>
          <img src={bkg_img} alt="" className='question_img'/>
        </div>

        <div className='question_img-box_2'>
          <img src={location_img} alt="" className='location_img'/>
        </div>

        <div className="buttons-box">
          {currentAnswer && <button className='back-btn btn'>back</button>}
          <button className='next-btn btn'
            onClick={()=>updateAllAnswers({...answerContext, [currentQuestion]: answerInput.answer})}
          >next</button>
        </div>

        <div className="question-box">
          <h1 className="question">{currentQuestion}</h1>
        </div>
        <div className="input-box">
          <input type="text" className="input"
          onChange={(e)=>updateAnswer({...answerInput, answer: e.target.value})}
          />
        </div>
        <div className="note-box">
          <h4 className="note">The amount of money you earn plays a smaller role in getting a mortgage than you might think.</h4>
        </div>

      
          <div className='floor-box'></div>
      </div>
    </section>
  );
};

export default Question
