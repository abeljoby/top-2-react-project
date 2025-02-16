import React, { useEffect, useState } from 'react';
import './index.css';

function Instructions({over, restart}) {
    const [infoOpen, setInfoOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInfoOpen(true);
        }, 500);
        return () => clearTimeout(timer);
    }, [setInfoOpen]);

    return (
        <>
            <button className="tip" aria-label="Open instructions tab" onClick={() => over ? restart() : setInfoOpen(!infoOpen)}>
                {over ?
                <svg className="retry" width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#fff" fill-rule="evenodd" d="M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.4019,0.6773972 12.361984,1.20757325 13.1838415,1.90671757 L13.4526,2.14597 L14.2929,1.30564 C14.8955087,0.703065739 15.9071843,1.0850774 15.994017,1.89911843 L16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1605348,6.00002 10.7153321,5.01450817 11.2294893,4.37749065 L11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z M6,5.46077 C6,5.09472714 6.37499031,4.86235811 6.69509872,5.0000726 L6.7678,5.03853 L10.7714,7.57776 C11.0528545,7.75626909 11.0784413,8.14585256 10.8481603,8.36273881 L10.7714,8.42224 L6.7678,10.9615 C6.45867857,11.1575214 6.06160816,10.965274 6.00646097,10.6211914 L6,10.5392 L6,5.46077 Z"/>
                </svg>
                :<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    <path fill="#000000" d="M0 0 C165 0 330 0 500 0 C500 165 500 330 500 500 C335 500 170 500 0 500 C0 335 0 170 0 0 Z " transform="translate(0,0)"/>
                    <path fill="#FFFFFF" d="M0 0 C17.82 0 35.64 0 54 0 C49.13371898 25.95349879 43.85874782 51.78191653 38.0859375 77.546875 C36.1931978 85.99536449 34.31912475 94.44785104 32.46142578 102.90411377 C32.02746574 104.87524522 31.59002215 106.84560882 31.15234375 108.81591797 C25.80413826 128.38337795 25.80413826 128.38337795 28.33984375 147.77734375 C30.6817242 150.9127084 33.29889484 152.0955946 37 153 C48.2703996 154.55062545 57.99127109 149.31916637 67 143 C70.90272799 139.93268023 74.63147895 136.66032644 78.37304688 133.40039062 C81.80285272 130.4482048 85.33866261 127.62477244 88.85546875 124.77734375 C91.03470231 123.02744291 91.03470231 123.02744291 93 121 C96.0390625 120.8046875 96.0390625 120.8046875 99.625 120.875 C100.81351563 120.89304687 102.00203125 120.91109375 103.2265625 120.9296875 C104.14179688 120.95289063 105.05703125 120.97609375 106 121 C102.82273508 124.81271791 99.600001 128.45516471 96.0625 131.9375 C93.46249847 134.49818204 90.99651376 137.10172391 88.625 139.875 C82.6961506 146.74922402 76.21612441 153.14681376 69.3046875 159.03125 C67.47551192 160.59379999 65.67582009 162.17793897 63.8828125 163.78125 C47.31644236 178.47373467 30.90024227 188.92350628 8.1328125 188.13623047 C-2.86754748 187.43359759 -13.2092661 182.7907339 -21 175 C-22.97131683 172.12446091 -24.52449983 169.15505888 -26 166 C-26.32226562 165.35675781 -26.64453125 164.71351563 -26.9765625 164.05078125 C-29.09825517 159.00432533 -29.30711609 153.91620751 -29.375 148.5 C-29.38893799 147.81945557 -29.40287598 147.13891113 -29.41723633 146.43774414 C-29.34524239 138.17901098 -27.54843856 130.08233938 -26 122 C-25.87069092 121.31911316 -25.74138184 120.63822632 -25.6081543 119.93670654 C-24.70254091 115.18165684 -23.76391578 110.43357593 -22.8125 105.6875 C-22.66482178 104.94832336 -22.51714355 104.20914673 -22.36499023 103.4475708 C-19.74943544 90.38608339 -16.91282433 77.37987487 -13.99047852 64.3840332 C-11.37984487 52.76938224 -8.87806393 41.13459417 -6.43359375 29.48388672 C-4.36399725 19.63673637 -2.18333422 9.825004 0 0 Z " transform="translate(210,200)"/>
                    <path fill="#FFFFFF"d="M0 0 C7.61753585 4.32600802 11.87106157 10.23542211 15.52734375 18.0703125 C17.45215995 26.99446035 16.63040116 35.53416629 11.92578125 43.41796875 C6.69799118 50.8962246 0.18736053 55.39748207 -8.78515625 57.2578125 C-17.52900168 58.30758604 -24.6678179 56.64243804 -32.01171875 51.78515625 C-38.23501857 46.8554637 -42.26634552 40.08198899 -43.78515625 32.2578125 C-44.64919536 22.63706937 -42.66454901 14.69799523 -36.59375 7.11328125 C-26.6474932 -3.09076191 -13.07910077 -6.06259776 0 0 Z " transform="translate(260,120)"/>
                </svg>}
            </button>
            <div className={`info ${infoOpen ? 'info-open' : ''}`} id="instructions">
                <div className="info-header" id="instructions-header">
                    <h1>Instructions</h1>
                    <a href="#" className="close" id="close-instructions" title="Close instructions tab" onClick={() => setInfoOpen(false)}></a>
                </div>
                <div className="info-content" id="instructions-content">
                    <p>Click on a card to score a point, but be careful not to pick the same one twice.</p>
                    <b>Enjoy!</b>
                </div>
            </div>
        </>
    );
}

export default Instructions;