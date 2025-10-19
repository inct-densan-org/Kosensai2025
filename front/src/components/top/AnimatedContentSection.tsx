'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ReactNode, useMemo, useRef } from 'react';

interface AnimatedContentSectionProps {
  title: string;
  children: ReactNode;
  sensibility?: number;
  colorReverseAnim?: 'tb' | 'bt'; // transparent → black or black → transparent
  className?: string;
}

export function AnimatedContentSection({ title, children, sensibility = 1, colorReverseAnim,  className }: AnimatedContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'], // 要素が画面下から現れ、画面上に見えなくなるまでをトラッキング
  });

  // useMemoを使用して、colorReverseAnimに依存する値を計算
  const { initialBgColor, bgColor, clipPathStart, clipPathEnd } = useMemo(() => {
    return {
      initialBgColor: colorReverseAnim === 'bt' ? 'bg-black' : 'bg-transparent',
      bgColor: colorReverseAnim === 'bt' ? 'bg-transparent' : 'bg-black',
      clipPathStart: colorReverseAnim === 'tb' ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
      clipPathEnd: 'inset(0% 0% 0% 0%)',
    };
  }, [colorReverseAnim]);

  // 1. 背景アニメーション
  const backgroundClipPath = useTransform(scrollYProgress, [0.05 * sensibility, 0.15 * sensibility], [clipPathStart, clipPathEnd]);

  // 2. タイトルの出現
  const titleOpacity = useTransform(scrollYProgress, [0.15 * sensibility, 0.2 * sensibility], [0, 1]);

  // 4. コンテンツボックスの出現
  const boxOpacity = useTransform(scrollYProgress, [0.2 * sensibility, 0.3 * sensibility], [0, 1]);
  const boxY = useTransform(scrollYProgress, [0.2 * sensibility, 0.3 * sensibility], ['64px', '0px']); // 初期位置を調整
    
  // 5. コンテンツの出現
  const contentOpacity = useTransform(scrollYProgress, [0.3 * sensibility, 0.4 * sensibility], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      className={`w-full overflow-hidden py-24 flex flex-col items-center justify-center text-white relative ${className || ''} ${initialBgColor}`}>
      {/* Background Gradient Animation Overlay */}
      {colorReverseAnim && (
        <motion.div
          className={`absolute inset-0 ${bgColor}`}
          style={{ clipPath: backgroundClipPath }}
        />
      )}

      <motion.div style={{ opacity: titleOpacity }}>
        <h2 className="text-4xl font-bold text-center text-white">{title}</h2>
      </motion.div>
        
      <motion.div
        className="w-[calc(100%-32px)] md:w-[calc(100%-128px)] mx-auto mt-8"
        style={{ opacity: boxOpacity, y: boxY }}>
        <div className="p-4 md:p-8 backdrop-blur-lg border-white border-[1px] rounded-xl">
          <motion.div style={{ opacity: contentOpacity }}>{children}</motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
