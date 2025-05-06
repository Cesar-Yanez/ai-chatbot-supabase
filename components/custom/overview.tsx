import { motion } from 'framer-motion';
import Link from 'next/link';

import { MessageIcon, SupabaseIcon, VercelIcon } from './icons';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <VercelIcon size={32} />
          <span>+</span>
          <SupabaseIcon />
          <span>+</span>
          <MessageIcon size={32} />
        </p>
        <p className="text-2xl font-bold">
          Chatbot base.
        </p>
        {/* <p>
          Este chatbot está diseñado para ayudarte con información, recursos y
          soluciones relacionadas con el mundo de la acuicultura. Desde el manejo
          de especies, optimización de procesos de cultivo, hasta
          recomendaciones para mejorar la sostenibilidad de tu operación,
          estamos aquí para apoyarte.
        </p> */}
        <p>
        Este chatbot funciona como una instancia base sin configuración activa. 
        No posee conocimientos ni habilidades predefinidas hasta que se le asigne 
        una configuración específica a través del sistema. 
        Está diseñado para adaptarse a distintos propósitos según las 
        instrucciones que reciba, permitiendo una personalización completa de su 
        comportamiento, tema y tareas. Hasta que se configure, no está habilitado 
        para responder preguntas ni realizar acciones.
        </p>
        <p>¿En qué podemos ayudarte hoy?</p>
      </div>
    </motion.div>
  );
};
