interface CreateTextSessionProps {
  prompt: (prompText: string) => Promise<string>;
}

export default CreateTextSessionProps;
