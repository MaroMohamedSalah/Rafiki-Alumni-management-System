import React from 'react'
import logo from "../imgs/logo.erorNotFound.png";
import img from "../animations/erorNotFound.json";
import Lottie from 'lottie-react'
import style from './NotFound.module.css'


export default function NotFound() {
    return <>
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <figure className='text-center'>
                    <img src={logo} alt="logo" className={style.editLogo + " "} />
                </figure>
                <div className="col-md-12">
                    <h2 className={style.editHead + ' text-center'}>ERROR 404 - PAGE NOT FOUND</h2>
                </div>
                <div className="col-md-3">
                    <div className=''>
                        <Lottie animationData={img}></Lottie>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className='d-flex flex-column align-items-center'>
                        <p className={style.editAlert}>The page you are looking for might have been removed
                            had its name changed
                            or is temporarily unavailable.</p>
                        <button className={style.btnEdit + ""}>GO TO HOMEPAGE</button>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className='d-flex flex-column align-items-center pb-2'>
                        <p className={style.editFooter + " text-center"}>Follow us on our social media accounts for any updates</p>
                        <div className={style.footerIcons + ' d-flex flex-row gap-4'}>
                            <a href="" target='__blank'><i class="fa-brands fa-github"></i></a>
                            <a href="https://www.facebook.com/rafikiFCAIHu?locale=ar_AR" target='__blank'><i class="fa-brands fa-facebook"></i></a>
                            <a href="https://www.linkedin.com/company/rafikih/"  target='__blank'><i class="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}



