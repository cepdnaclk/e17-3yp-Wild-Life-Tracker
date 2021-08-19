import React from 'react';
import './styles.css';

export default function Template(props) {

/*
* Template for login and register pages
* Usage : <Template left='left_content' right='right_content'/>
*/
  return (
    <div className="container-fluid h-100">
    <div className="row min-vh-100 flex-column flex-md-row">

        {/*left side of the template*/}
        <aside className="col-12 col-md-4 p-0 flex-shrink-1" id="left">
            <div className="text-center logo">
              	{props.left}
            </div>
        </aside>

        {/*right side of the template*/}
        <main className="col" id="right">
          <div className="form">
                {props.right}
          </div>          
        </main>
    </div>
</div>
  );
}