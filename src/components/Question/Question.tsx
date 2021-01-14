import React, { useState, useContext }  from 'react';
import { Link } from 'react-router-dom';
import {QuestionContext} from '../../types';
import './Question.css'
import bkg_img from '../../images/questions/Big Shoes - Sitting On Floor.png'
import location_img from '../../images/questions/Charco - Location Map.png'

interface Props{
  updateAllAnswers: any;
}
export const Question: React.FC<Props> = ({updateAllAnswers}) => {
  
  const questionContext = useContext(QuestionContext)
  const questionSet = Object.keys(questionContext);
  
  const [answerInput, updateAnswer] = useState<any>({});
  const [index, setIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  let currentQuestion = questionContext[questionSet[index]]

    const nextQuestion = () => {
      let userAmount = answerInput[questionSet[index]]
      let isnum = /^\d+$/.test(userAmount)
      if (!userAmount || !isnum) {
        setErrorMessage('Sorry but we need this information')
        return false
      } else if (index < questionSet.length && answerInput[questionSet[index]]){
        setIndex(index + 1)
      }
    }

    const prevQuestion = () => {
      setIndex(index - 1)
    }

    const validateString = (e: any)=> {
      updateAnswer({...answerInput,[questionSet[index]]: e.target.value});
      let isnum = /^\d+$/.test(e.target.value);
      if(!isnum){
        setErrorMessage('only numbers')
        setTimeout(() => setErrorMessage(''), 4000)
      } else{
        setErrorMessage('')
      }
    }

    return (
      <section className='question-section'>

        <div className="inner-container">

          <div className='desc-container'>
            <div className="description-box" data-testid='description-container'>
              <h2 style={{ backgroundColor: 'black',  width: '5px'}}className='desc'>💡</h2>
              <h1  data-testid='description-title' className="question-desc">{currentQuestion?.attributes?.classification}</h1>
              <h2  data-testid='description-body' className='desc'>{currentQuestion?.attributes?.description}</h2>
            </div>
          </div>

        <div className='question_img-box_1'>
          <img   data-testid='back-image-1' src={bkg_img} alt="Background images, avatar is stading on the left side of the window smiling at you" className='question_img'/>
        </div>

        <div className='question_img-box_2'>
          <img  data-testid='back-image-2' src={location_img} alt="" className='location_img'/>
        </div>

        {errorMessage && <div className='error_box'>
          <h3 data-testid='error-message' className='error-input'>{errorMessage}</h3>
        </div>}

        <div className="buttons-box">
          <div className="bx">
            <button className={index === 0 ? 'hidden' : 'back-btn btn'}
              onClick={() => {prevQuestion()}}>back</button>
          </div>
          <div className="bx">
            {questionSet.indexOf(questionSet[index]) !== questionSet.length - 1
            ? <button className='next-btn btn'
              onClick={() => {nextQuestion()}}>
                next</button>
            :
              <Link to="/generate_report">
                <button
                  data-testid='update-answers-btn'
                  className='next-btn btn'
                  onClick={(e) => {updateAllAnswers(answerInput)}}>
                    next</button>
              </Link>}
          </div>
        </div>

        <div className="question-box" data-testid='the-question'>
          <p className="question">{currentQuestion?.attributes?.question}</p>
        </div>

        <div className="input-box">
          <input
            placeholder='your answer'
            type="text"
            className="input"
            value={answerInput[questionSet[index]] || ''}
            onChange={(e)=>validateString(e)}
          />
        </div>

        <div className="note-box">
          <h4 className="note">{currentQuestion?.attributes?.note}</h4>
        </div>

        <div className='floor-box'></div>
        <h4 className="note">{currentQuestion?.attributes?.source}</h4>
      </div>
    </section>
  );
};

export default Question
