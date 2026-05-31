import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.question.deleteMany();

  const anlauteData = [
    { emoji: '🍌', word: 'Banane', answer: 'B', difficulty: 'leicht' },
    { emoji: '👃', word: 'Nase', answer: 'N', difficulty: 'leicht' },
    { emoji: '🦕', word: 'Dino', answer: 'D', difficulty: 'leicht' },
    { emoji: '☁️', word: 'Wolke', answer: 'W', difficulty: 'leicht' },
    { emoji: '🔧', word: 'Schraube', answer: 'S', difficulty: 'mittel' },
    { emoji: '🪀', word: 'Jojo', answer: 'J', difficulty: 'leicht' },
    { emoji: '👁️', word: 'Auge', answer: 'A', difficulty: 'leicht' },
    { emoji: '🦷', word: 'Zahn', answer: 'Z', difficulty: 'leicht' },
    { emoji: '🖼️', word: 'Bild', answer: 'B', difficulty: 'mittel' },
    { emoji: '⚖️', word: 'Waage', answer: 'W', difficulty: 'mittel' },
    { emoji: '🫙', word: 'Krug', answer: 'K', difficulty: 'mittel' },
    { emoji: '🦛', word: 'Nilpferd', answer: 'N', difficulty: 'schwer' },
    { emoji: '🦶', word: 'Fuß', answer: 'F', difficulty: 'leicht' },
    { emoji: '🪿', word: 'Ente', answer: 'E', difficulty: 'leicht' },
    { emoji: '🌾', word: 'Reihe', answer: 'R', difficulty: 'mittel' },
    { emoji: '🎈', word: 'Ballon', answer: 'B', difficulty: 'leicht' },
  ];

  const silbenData = [
    { emoji: '👃', word: 'Nase', answer: 'Na', wrongAnswer: 'Ne', difficulty: 'leicht' },
    { emoji: '🌹', word: 'Rose', answer: 'Ro', wrongAnswer: 'Ra', difficulty: 'leicht' },
    { emoji: '🪶', word: 'Feder', answer: 'Fe', wrongAnswer: 'Fu', difficulty: 'leicht' },
    { emoji: '🛋️', word: 'Sofa', answer: 'So', wrongAnswer: 'Se', difficulty: 'leicht' },
    { emoji: '🪡', word: 'Nadel', answer: 'Na', wrongAnswer: 'Nu', difficulty: 'mittel' },
    { emoji: '🥗', word: 'Salat', answer: 'Sa', wrongAnswer: 'Su', difficulty: 'mittel' },
    { emoji: '🔨', word: 'Nagel', answer: 'Na', wrongAnswer: 'Nu', difficulty: 'mittel' },
    { emoji: '📚', word: 'Regal', answer: 'Re', wrongAnswer: 'Rau', difficulty: 'mittel' },
    { emoji: '🔍', word: 'Lupe', answer: 'Lu', wrongAnswer: 'Le', difficulty: 'leicht' },
    { emoji: '🌧️', word: 'Regen', answer: 'Re', wrongAnswer: 'Ro', difficulty: 'schwer' },
    { emoji: '🐢', word: 'Schildkröte', answer: 'Schild', wrongAnswer: 'Schul', difficulty: 'schwer' },
  ];

  const endlauteData = [
    { emoji: '👵', word: 'Oma', answer: 'a', hint: 'Om', difficulty: 'leicht' },
    { emoji: '👃', word: 'Nase', answer: 'e', hint: 'Nas', difficulty: 'leicht' },
    { emoji: '🐳', word: 'Wal', answer: 'l', hint: 'Wa', difficulty: 'leicht' },
    { emoji: '🌴', word: 'Palme', answer: 'e', hint: 'Palm', difficulty: 'leicht' },
    { emoji: '🏗️', word: 'Kran', answer: 'n', hint: 'Kra', difficulty: 'mittel' },
    { emoji: '🚿', word: 'Dusche', answer: 'e', hint: 'Dusch', difficulty: 'mittel' },
    { emoji: '🐟', word: 'Fisch', answer: 'h', hint: 'Fisc', difficulty: 'mittel' },
    { emoji: '✂️', word: 'Schere', answer: 'e', hint: 'Scher', difficulty: 'mittel' },
    { emoji: '🐑', word: 'Schaf', answer: 'f', hint: 'Scha', difficulty: 'schwer' },
    { emoji: '🐸', word: 'Frosch', answer: 'h', hint: 'Frosc', difficulty: 'schwer' },
    { emoji: '🛋️', word: 'Sofa', answer: 'a', hint: 'Sof', difficulty: 'leicht' },
    { emoji: '👓', word: 'Brille', answer: 'e', hint: 'Brill', difficulty: 'mittel' },
    { emoji: '🐬', word: 'Delfin', answer: 'n', hint: 'Delfi', difficulty: 'schwer' },
    { emoji: '🧀', word: 'Käse', answer: 'e', hint: 'Käs', difficulty: 'leicht' },
    { emoji: '🚗', word: 'Auto', answer: 'o', hint: 'Aut', difficulty: 'leicht' },
  ];

  const woerterData = [
    { emoji: '🐰', word: 'Hase', answer: 'Hase', difficulty: 'leicht' },
    { emoji: '👃', word: 'Nase', answer: 'Nase', difficulty: 'leicht' },
    { emoji: '🛋️', word: 'Sofa', answer: 'Sofa', difficulty: 'leicht' },
    { emoji: '🔍', word: 'Lupe', answer: 'Lupe', difficulty: 'leicht' },
    { emoji: '🌹', word: 'Rose', answer: 'Rose', difficulty: 'leicht' },
    { emoji: '🦷', word: 'Zahn', answer: 'Zahn', difficulty: 'mittel' },
    { emoji: '🍌', word: 'Kiwi', answer: 'Kiwi', difficulty: 'mittel' },
    { emoji: '🪶', word: 'Feder', answer: 'Feder', difficulty: 'schwer' },
    { emoji: '🐳', word: 'Wal', answer: 'Wal', difficulty: 'leicht' },
    { emoji: '🌴', word: 'Palme', answer: 'Palme', difficulty: 'schwer' },
  ];

  for (const q of anlauteData)
    await prisma.question.create({ data: { type: 'anlaute', ...q } });
  for (const q of silbenData)
    await prisma.question.create({ data: { type: 'silben', ...q } });
  for (const q of endlauteData)
    await prisma.question.create({ data: { type: 'endlaute', ...q } });
  for (const q of woerterData)
    await prisma.question.create({ data: { type: 'woerter', ...q } });

  console.log('Seed tamamlandi!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
