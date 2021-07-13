import React from 'react'
import './Landing.css'
import {Button} from '../Button'

import {useHistory} from 'react-router-dom';


function HomeCopy({lighBT, responsive}){
    const history = useHistory() 
    const [lightBT, setLightBT] = React.useState(null)
    const sectionRef = React.useRef(null);
    
    const observer = new IntersectionObserver(([entries])=>{

        if (entries.isIntersecting) {
            console.log(`it gets fired`)
            entries.target.style.animation = `anim1 ${entries.target.dataset.delay} ease-out`
        } else {
            entries.target.style.animation = 'none'
        }
        
    })
    
    // const handleChange = () =>  setLightBT(!lightBT)
    const handleResize = () =>{
        
        if(window.innerWidth <= responsive.width){
            setLightBT(true)
        } else {
            setLightBT(false)
        }
    }
    window.addEventListener('resize', handleResize)

    React.useEffect(()=>{  
        
        const visible = sectionRef.current.children;

        for(var i = visible.length ; i > 0 ; i--){
            observer.observe(visible[i-1])
        };

        handleResize();

    },[])

    const RedirectToLog = () => {
        history.push('/auth')
    }
    return (
        <div ref={sectionRef}>

            <div id="one" className={lightBT?"home-body-section":"home-body"} 
                data-delay="1s" style={{animation:'anim1 1s both ease-out'}}>
                <div className={ lightBT ? 'home--hero-section' : 'home--hero'} data-delay="1s">
                    <div className='container-left' data-delay=".5s">
                        <p className="col-one"> Exclusive Content</p>
                        <p className="col-two">  Unlimited Transactions with zero fees</p>
                        <p className="col-three">  
                        Get access to our exclusive diamond card that allows you to send unlimited transaction with out getting charged any fees.
                        </p>
                        <div className="col-three">
                            <Button buttonStyle="btn--outline" onClick={RedirectToLog}> Get Started </Button>
                        </div>
                        
                    </div>  
                    <div className='container-right'>
                        <img src='/images/svg-1.svg' alt='svg1'/>
                    </div>
                </div>  
            </div>

            <div id="two" className={lightBT?"home-body-section":"home-body"} data-delay="1s">
                <div className={ lightBT ? 'home--hero-section' : 'home--hero'} data-delay="1s">
                    <div style={{textAlign:'center'}} className='container-left' data-delay=".5s">
                        <img src='/images/svg-2.svg' alt='svg1'/>
                        
                    </div>  
                    <div style={{textAlign:'left'}} className='container-right'>
                    <p className="col-one"> Unlimited Access</p>
                        <p className="col-two">  What does 'unlimited transactions' mean?</p>
                        <p className="col-three">  
                        'Unlimited transactions' means there is no limit to your online, EFTPOS, ATM or staff-assisted transactions.
                        </p>
                        <div className="col-three">
                            <Button buttonStyle="btn--outline" onClick={RedirectToLog}> Get Started </Button>
                        </div>
                    </div>
                </div>  
            </div>

            <div id="three" className={lightBT?"home-body-section":"home-body"} data-delay="1s">
                <div className={ lightBT ? 'home--hero-section' : 'home--hero'} data-delay="1s">
                    <div className='container-left' data-delay=".5s">
                        <p className="col-one"> Outstanding performance</p>
                        <p className="col-two">  Unlimited Transactions with zero fees </p>
                        <p className="col-three">  
                        Financial performance is a subjective measure of how well a firm can use assets from its primary mode of business and generate revenues. The term is also used as a general measure of a firm's overall financial health over a given period.
                        </p>
                        <div className="col-three">
                            <Button buttonStyle="btn--outline" onClick={RedirectToLog}> Get Started </Button>
                        </div>
                        
                    </div>  
                    <div className='container-right'>
                        <img src='/images/svg-3.svg' alt='svg1'/>
                    </div>
                </div>  
            </div>

            <div id="four" className={lightBT?"home-body-section":"home-body"} data-delay="1s">
                <div className={ lightBT ? 'home--hero-section' : 'home--hero'} data-delay="1s">
                    <div style={{textAlign:'center'}} className='container-left' data-delay=".5s">
                        <img src='/images/svg-2.svg' alt='svg1'/>
                        
                    </div>  
                    <div style={{textAlign:'left'}} className='container-right'>
                    <p className="col-one"> Customer Reviews</p>
                        <p className="col-two">  Find helpful customer reviews and review ratings for Amazing Offers here</p>
                        <p className="col-three">  
                        Read honest and unbiased product reviews from our users.
                        </p>
                        <div className="col-three">
                            <Button buttonStyle="btn--outline" onClick={RedirectToLog}> Get Started </Button>
                        </div>
                    </div>
                </div>  
            </div>
            <footer style={{position:'static'}}>
                <p> this is the footer</p>
            </footer>
           
        </div>
    )
}

export default HomeCopy
