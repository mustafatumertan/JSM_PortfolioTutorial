import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import ReactTooltip from 'react-tooltip'
import {AppWrap, MotionWrap} from '../../wrapper';
import {urlFor, client} from '../../client';

import './Skills.scss';

const Skills = () => {

   const [skills, setSkills] = useState([]);
   const [experience, setExperience] = useState([]);

   useEffect(() => {
      const query = '*[_type == "experiences"]';
      const skillsQuery = '*[_type == "skills"]';

      client.fetch(query).then((data) => {
         setExperience(data);
      });

      client.fetch(skillsQuery).then((data) => {
         setSkills(data);
      });
   }, []);


   return (
      <>
         <h2 className="head-text">Skills & Experience</h2>

         <div className="app__skills-container">
            <motion.div className="app__skills-list">
               {skills?.map((sk) => (
                  <motion.div
                     whileInView={{opacity: [0,1]}}
                     transition={{duration: 0.5}}
                     className="app__skills-item app__flex"
                     key={sk.name}
                  >
                     <div className="app__flex" style={{backgroundColor: sk.bgColor}}>
                        <img src={urlFor(sk.icon)} alt={sk.name} />
                     </div>
                     <p className="p-text">{sk.name}</p>
                  </motion.div>
               ))}
            </motion.div>
            
            <motion.div className='app__skills-exp'>
                  {experience?.map((exp) => (

                     <motion.div
                        className="app__skills-exp-item"
                        key={exp.year}
                     >
                        <div className="app__skills-exp-year">
                           <p className="bold-text">{exp.year}</p>
                        </div>

                        <motion.div className="app__skills-exp-works">
                           {exp.works.map((w) => (
                              <>
                                 <motion.div
                                    whileInView={{opacity: [0,1]}}
                                    transition={{duration: 0.5}}
                                    className="app__skills-exp-work"
                                    data-tip
                                    data-for={w.name}
                                    key={w.name}
                                 >
                                    <h4 className="bold-text">{w.name}</h4>
                                    <p className="p-text">{w.company}</p>
                                 </motion.div>
                                 <ReactTooltip
                                    id={w.name}
                                    effect="solid"
                                    arrowColor="#fff"
                                    className="skills-tooltip"
                                 >
                                    {w.desc}
                                 </ReactTooltip>
                              </>
                           ))}
                        </motion.div>
                     </motion.div>
                  ))}
            </motion.div>


         </div>
      </>
   );
}

export default AppWrap(
   MotionWrap(Skills, "app__skills"),
   "skills",
   "app__whitebg"
   );